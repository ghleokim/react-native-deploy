import { StyleSheet } from "react-native";
import { Colors } from "./CustomColor";

export const CustomText = StyleSheet.create({
  logo: {
    fontFamily: "Palatino Header",
    fontWeight: '700',
    fontSize: 24
  },
  titleHN: {
    fontFamily: "Helvetica Neue, sans-serif",
    fontWeight: '700'
  },
  title: {
    fontFamily: "sans-serif, Gill Sans",
    fontWeight: '700',
  },
  body: {
    fontFamily: 'sans-serif, Gill Sans',
    fontWeight: '500'
  },
  textCenter: {
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic'
  }
})

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
  inputContainer: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: Colors.navy,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5
  },
  buttons: {
    height: 40,
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.navy
  },
  highlight: {
    fontWeight: '700',
  }
})