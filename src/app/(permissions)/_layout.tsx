import { Stack } from "expo-router";
import HeaderLogo from "../../constants/Icons/HeaderLogo";
import Colors from "../../constants/Colors";
import { usePathname } from "expo-router";
import { View, Text } from "../../components/Themed";
export default function PermissionsLayout() {
  return (
    <View>
      <Text>Permissions Layout</Text>
      <View>
        Enabled Location
      </View>
    </View>
  );
}