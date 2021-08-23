import { FormikTouched } from "formik";
import { FC, ReactNode } from "react";

interface IIf {
  condition: boolean | string | null| FormikTouched<any> | FormikTouched<any>[] | undefined;
  children: ReactNode;
  anotherChildren?: ReactNode | null;
}

export const If: FC<IIf> = ({
  children,
  condition,
  anotherChildren = null,
}) => <>{condition ? children : anotherChildren}</>;
