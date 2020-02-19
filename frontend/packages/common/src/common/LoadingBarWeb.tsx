import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { LoadingStoreContext } from "../store/LoadingStore";
import Loader from 'react-loader-spinner'

export default observer(() => {
  const loadingStore = useContext(LoadingStoreContext);

  return(
    <Loader
       type="MutatingDots"
       color="#666666"
       height={30}
       width={100}
       visible={loadingStore.loadingCount > 0}
    />
  )
})

