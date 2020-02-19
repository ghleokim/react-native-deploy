import React, {useContext} from "react";
import { View, Platform , StyleSheet } from "react-native";
import LoadingBarWeb from './LoadingBarWeb'
import { LoadingStoreContext } from "../store/LoadingStore";
import { observer } from "mobx-react-lite";

export default observer(() => {
    const loadingStore = useContext(LoadingStoreContext);

    return (
        <View style={loadingStore.loadingCount > 0 ? styles.loading : styles.notLoading}>
        </View>
  )
})

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        zIndex: 9999,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#999999',
        opacity: .2
    },
    notLoading: {
        zIndex: -1,
    }
});
