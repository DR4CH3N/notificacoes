import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

/* manipulador de eventos de notificação */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    /* ouvinte de evento para as notificações recebidas */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);

      // Necessario para IOS
      async function permissoesIos() {
        return await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowSound: true,
            allowBadge: true,
            allowAnnouncements: true,
          },
        });
      }
    });

    /* ouvinte de evento para as respostas dadas as notificações, ou seja, quando o usuario toca/interage na notificação */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "lembrete! 👺",
      body: "Não se esqueça de beber agua! 💧",
      sound: Platform.OS === "ios" ? "default" : "", // necessario pro Ios
      data: { usuario: "Matheus", cidade: "São Paulo" },
    };

    Notifications.scheduleNotificationAsync({
      // função de agendamento de notificações
      content: mensagem,
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Text>Exemplo de sistemas de notificação</Text>
        <Button onPress={enviarMensagem} title="Disparar notificação" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
