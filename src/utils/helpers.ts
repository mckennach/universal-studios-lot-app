// import { Text } from "@/components/Themed";

export const logObject = (label = "Output", obj: any) => {
    console.log(label, JSON.stringify(obj, null, 2));
}

export const formatParagraph = (str: string) => {
    if(!str) return null;
    return str
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')
        .replace(/<br\/>/g, '')
        .replace(/<br \/>/g, ' ')
        .replace('&amp;', '&')
        .replace('&nbsp;', ' ')
        .replace('&&nbsp;', '& ');
};

export const formatTextNewLineToBreaks = (str: string) => {
    if(!str) return null;
    return str
        .replace('<p>&nbsp;</p>', ' ')
        .replace('&nbsp;', ' ')
        .replace(/\n/g, '');
};

export const contactUrl = 'tel://8187773000';

export const chunkMaxLength = (arr: [], chunkSize: number, maxLength: number) => {
  return Array.from({length: maxLength}, () => arr.splice(0,chunkSize));
}

// export const formatParagraphWithBreaks = function(str: string) {
//   const strippedString = str
//     .replace(/<p>/g, '')
//     .replace(/<\/p>/g, '')
//     .replace(/<strong>/g, '')
//     .replace(/<\/strong>/g, '')
//     .replace('&amp;', '&')
//     .replace('&nbsp;', ' ')
//     .replace('&&nbsp;', '& ');

//   return strippedString.split('<br />').map((item, i) => (
//     return <Text key={i}>{item}</Text>;
//     );
// };


