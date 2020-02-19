import React, {useContext} from "react";
import { View, Platform , StyleSheet } from "react-native";
import LoadingBarWeb from './LoadingBarWeb'
import { LoadingStoreContext } from "../store/LoadingStore";
import { observer } from "mobx-react-lite";

export default observer(() => {
    const loadingStore = useContext(LoadingStoreContext);

    return (
        <View style={styles.loading}>
            {Platform.OS === 'web' 
                ? <LoadingBarWeb></LoadingBarWeb>
                : <></>
            }
        </View>
  )
})

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        zIndex: 10000,
        left: '50%',
        top: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
    }
});
