import { sequenceFrames } from "@/data/process";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollSequence() {
  const reducedMotion =
    useReducedMotion();

  // ==========================================================
  // NOTE
  // ==========================================================
  //
  // الـ50 Frame أصبحت الآن جزءًا من Hero.tsx.
  //
  // هذا المكوّن لا يعرض sequence ثانية حتى لا تتكرر
  // الصور أثناء التمرير.
  //
  // نحتفظ به مؤقتًا حتى لا نكسر أي import موجود في المشروع.
  // ==========================================================

  if (
    reducedMotion ||
    sequenceFrames.length === 0
  ) {
    return null;
  }

  return null;
}
