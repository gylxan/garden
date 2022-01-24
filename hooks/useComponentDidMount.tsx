import React from 'react';

export default function useComponentDidMount(func: React.EffectCallback) {
  React.useEffect(func, []);
}
