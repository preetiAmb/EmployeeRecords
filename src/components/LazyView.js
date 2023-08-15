import React, { lazy, Suspense } from "react";

const View = lazy(() => import("./View"));

const LazyView = () => {
  return (
    <Suspense fallback={<div>Loading view...</div>}>
      <View />
    </Suspense>
  );
};

export default LazyView;
