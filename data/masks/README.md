# Full 3D masks — BRATS_001–003

Complete reference and prediction segmentation masks for the three studies
shown in the viewer, published so that every volume and 3D Dice value the
project reports can be recomputed exactly, voxel by voxel.

| File | Meaning |
|---|---|
| `BRATS_00X_seg.nii.gz` | Reference annotation mask |
| `BRATS_00X_monai_seg.nii.gz` | Model (MONAI) prediction mask |

Label convention (MSD Task01 / BraTS): 1 = necrotic & non-enhancing core,
2 = edema, 4 = enhancing tumour. Regions: WT = {1,2,4}, TC = {1,4}, ET = {4}.

## Recompute

```bash
python3 recompute3d.py /path/to/this/folder
```

`recompute3d-results.json` holds the verified output: all 9 regional 3D Dice
values and all 18 volumes match the recorded pipeline results exactly
(voxel-exact). The viewer's per-study JSONs carry the same mask-exact volumes.

## Attribution & licence

Source data: Medical Segmentation Decathlon (MSD) Task01 — BrainTumour
(BraTS), released under **CC BY-SA 4.0**. These masks are redistributed under
the same licence. Research demonstration only — not a medical diagnostic
system.
