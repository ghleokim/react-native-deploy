import { StyleSheet } from "react-native";
import { Colors } from "./CustomColor";

export const CustomStyle = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    alignItems: "center"
  },
  input: {
    height: 40,
    borderColor: Colors.navy,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5
  },
  highlight: {
    fontWeight: '700',
  }
})