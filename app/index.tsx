//@ts-nocheck
import { Link, router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, View, Text } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '@/constants/categories';

export default function HomeScreen() {
    const renderItem = (item) => {
        return (
            <Pressable style={{ 
                backgroundColor: "#ffffff", 
                borderColor: "transparent",
                borderRadius: 8, 
                borderWidth: 1, 
                display: "flex", 
                flex: 1,
                flexDirection: "column",
                justifyContent: "center", 
                padding: 24 
            }}
            onPress={() => {
                router.navigate({ pathname: "/puzzle", params: { category: item.slug } });
            }}
            >
                <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Text style={{ marginBottom: 16, fontSize: 40 }}>
                        {item.icon}
                    </Text>
                    <Text style={{ color: "black", fontSize: 16 }}>{item.title}</Text>
                </View>
            </Pressable>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{
                    marginBottom: 48
                }}>
                    <Text style={{ fontWeight: 900, fontSize: 48, color: "red" }}>
                        50+
                    </Text>
                    <Text style={{ fontSize: 36 }}>Puzzle Categories</Text>
                </View>
                <FlatList 
                    renderItem={({ item }) => renderItem(item)} 
                    data={categories} 
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16 }}
                    columnWrapperStyle={{ gap: 16 }}
                    style={{ width: "100%" }}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1, 
    height: "100%", 
    backgroundColor: "#E3E7EB"
  }
});
