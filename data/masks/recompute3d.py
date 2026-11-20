#!/usr/bin/env python3
"""Exact 3D recompute from the full reference + prediction masks.

Closes the gap the outline-based check (recompute.py) could not: with the
complete 3D masks, volumes and 3D Dice are computed exactly, voxel by voxel.

Label convention (MSD Task01 / BraTS): 1 = necrotic & non-enhancing core,
2 = edema, 4 = enhancing tumour.  WT = {1,2,4}, TC = {1,4}, ET = {4}.
Both masks are checked for identical shape and spacing before comparing.
"""
import json, sys
import numpy as np
import nibabel as nib
from pathlib import Path

MASKS = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "workspace/mri-masks"
REGIONS = {"WT": (1, 2, 4), "TC": (1, 4), "ET": (4,)}
STUDIES = ["BRATS_001", "BRATS_002", "BRATS_003"]

def load(p):
    img = nib.load(str(p))
    return img.get_fdata().astype(np.int16), tuple(round(float(z), 4) for z in img.header.get_zooms()[:3]), img.shape

out = {}
for s in STUDIES:
    ref, rsp, rshape = load(MASKS / f"{s}_seg.nii.gz")
    pred, psp, pshape = load(MASKS / f"{s}_monai_seg.nii.gz")
    assert rshape == pshape, f"{s}: shape mismatch {rshape} vs {pshape}"
    assert rsp == psp, f"{s}: spacing mismatch {rsp} vs {psp}"
    vox_ml = float(np.prod(rsp)) / 1000.0
    res = {"shape": list(rshape), "spacing_mm": list(rsp), "regions": {}}
    for region, labels in REGIONS.items():
        r = np.isin(ref, labels); p = np.isin(pred, labels)
        inter = int(np.logical_and(r, p).sum())
        rc, pc = int(r.sum()), int(p.sum())
        dice = (2 * inter / (rc + pc)) if (rc + pc) else None
        res["regions"][region] = {
            "dice_3d": round(dice, 6) if dice is not None else None,
            "reference_ml": round(rc * vox_ml, 3),
            "prediction_ml": round(pc * vox_ml, 3),
            "reference_voxels": rc, "prediction_voxels": pc, "intersection_voxels": inter,
        }
    out[s] = res
    print(f"== {s}  shape={rshape} spacing={rsp} ==")
    for region, v in res["regions"].items():
        print(f"  {region}: 3D Dice={v['dice_3d']}  ref={v['reference_ml']} mL  pred={v['prediction_ml']} mL")

Path(MASKS / "recompute3d-results.json").write_text(json.dumps(out, indent=2))
print("\nwrote", MASKS / "recompute3d-results.json")
