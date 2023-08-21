import type { PropType, ExtractPropTypes } from "vue";

export const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  /**
   * @deprecated
   * Text type will be deprecated in the next major version (3.0.0)
   */
  "text",
  "",
] as const;

export const buttonProps = {
  disabled: Boolean,
  /**
   * @description button type
   */
  type: {
    type: String as PropType<(typeof buttonTypes)[number]>,
    validator: (val: unknown) => buttonTypes.includes(val as any),
    default: "",
  },
};
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
