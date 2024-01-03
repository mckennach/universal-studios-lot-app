/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { StyleSheet } from 'react-native';
import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native';
import RNModal from "react-native-modal";
import { HeadingBoldText } from './StyledText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type ModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  onSwipeComplete: () => void;
}

export function Modal(props: ModalProps) {
  const { children, isModalOpen, setIsModalOpen, onSwipeComplete } = props;
  return (
    <RNModal
      isVisible={isModalOpen}
      onBackdropPress={() => setIsModalOpen(false)}
      onSwipeComplete={onSwipeComplete}
      swipeDirection="up"
      coverScreen={true}
      deviceWidth={Layout.window.width}
      deviceHeight={Layout.window.height + 400}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
    >
      {children}
    </RNModal>
  );
}

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.header}>
    {children}
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.creamBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.dark.creamBg,
    borderStyle: "solid",
    paddingVertical: 50,
    paddingHorizontal: 5,
    // height: Layout.window.height / 1.5,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.creamBg,
    marginBottom: 10
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    color: Colors.dark.greyText,
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    // minHeight: 100,
    marginBottom: 15,
    backgroundColor: Colors.dark.creamBg,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    marginTop: 50,
    backgroundColor: Colors.dark.creamBg,
    // justifySelf: "flex-end",
    // alignSelf: "flex-end",
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;





