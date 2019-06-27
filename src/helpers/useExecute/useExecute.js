import React from 'react';

function useExecute(callback, dependencies = []) {
  const memoizedCallback = React.useCallback(callback, dependencies)

  React.useEffect(() => {
    memoizedCallback()
  }, [memoizedCallback])
}

export default useExecute;