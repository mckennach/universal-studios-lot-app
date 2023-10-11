import { Text, TextProps } from './Themed';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import RenderHtml, { defaultSystemFonts, HTMLSource} from "react-native-render-html";

export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "BrandonGrotesqueRegular" }]}
    />
  );
}

export function HeadingMediumText(props: TextProps) {

  
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "BrandonGrotesqueRegular", letterSpacing: 1, textTransform: "uppercase" }]}
    />
  );
}


export function HeadingBoldText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "BrandonGrotesqueBold",
          letterSpacing: 1.8,
          textTransform: "uppercase",
        },
      ]}
    />
  );
}

export function ParagraphText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "BrandonGrotesqueRegular"
        },
      ]}
    />
  );
}

export function ParagraphMediumText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "BrandonTextMedium",
        },
      ]}
    />
  );
}


export function LightText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "BrandonTextRegular",
        },
      ]}
    />
  );
}

export function TabText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "PresicavLight",
          textTransform: "uppercase",
        },
      ]}
    />
  );
}

export function StagesSmallText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: "BrandonTextMedium",
          fontSize: 9,
          letterSpacing: 0.5,
          color: Colors.dark.creamText,
        },
      ]}
    />
  );
}

interface HTMLProps extends TextProps {
  txtColor?: string;
  source: {
    html: string
  }
}

export function HTML(props: HTMLProps) {
  const systemFonts = [
    ...defaultSystemFonts,
    "BrandonTextRegular",
    "BrandonGrotesqueMedium",
  ];
   const tagStyles = {
    //  body: {
    //    whiteSpace: "normal",
    //    color: "gray",
    //  },
     ul: {
       color: props.txtColor ? props.txtColor : Colors.dark.creamText,
       paddingLeft: 10,
       fontSize: 10,
     },
     li: {
       color: props.txtColor ? props.txtColor : Colors.dark.creamText,
       fontSize: 13,
       letterSpacing: 0.6,
       fontFamily: "BrandonTextRegular",
       marginBottom: 5,
       paddingLeft: 5,
     },
     p: {
       color: props.txtColor ? props.txtColor : Colors.dark.creamText,
       fontSize: 13,
       letterSpacing: 0.6,
       fontFamily: "BrandonTextRegular",
     },
     strong: {
       color: props.txtColor ? props.txtColor : Colors.dark.creamText,
       fontSize: 12,
       letterSpacing: 1,
       marginTop: 12,
       fontFamily: "BrandonGrotesqueMedium",
     },
     a: {
       color: props.txtColor ? props.txtColor : Colors.dark.creamText,
       textDecorationColor: props.txtColor
         ? props.txtColor
         : Colors.dark.creamText,
     },
  };

  return (
    <RenderHtml
      source={props.source}

      tagsStyles={tagStyles}
      // classesStyles={tagStyles}
      contentWidth={Layout.window.width}
      systemFonts={systemFonts}
    />
  );
}

