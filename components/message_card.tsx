import {Text, View} from 'react-native';

type Props = {
  title: String;
  message: String;
};

export default function Message_card({title, message}: Props) {
  return (
    <View className="w-full h-28 bg-[#343434] ml-4 mt-4 pt-2 px-4 pr-8">
      <Text className="text-[#9A48EC] w-full h-4 font-semibold mt-4">
        {title}
      </Text>
      <Text numberOfLines={2} className="text-[#9A48EC] w-full h-full mt-4">
        {message}
      </Text>
    </View>
  );
}
