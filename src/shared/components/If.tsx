import { FormikTouched } from "formik";
import { FC, ReactNode } from "react";

interface IIf {
  condition: boolean | string | FormikTouched<any> | FormikTouched<any>[];
  children: ReactNode;
  anotherChildren?: ReactNode | null;
}

export const If: FC<IIf> = ({
  children,
  condition,
  anotherChildren = null,
}) => <>{condition ? children : anotherChildren}</>;
