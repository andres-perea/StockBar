import React from "react";
import { Card, Metric, Text } from "@tremor/react";

export function Saldo() {
  return (
    <>
      <Card className="mx-auto max-w-xs" decoration="top" decorationColor="red">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Saldo
        </p>
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          $35,500
        </p>
      </Card>
    </>
  );
}
