import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-add",30),
        Icon.getImageSource("md-game-controller-a",30),
        Icon.getImageSource("md-create",30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: 'AwesomeProject.ConnectWifiScreen',
                    label: 'Add Device',
                    title: 'Add Device',
                    icon: sources[0]
                },
                {
                    screen: 'AwesomeProject.CommandTabScreen',
                    label: 'Command',
                    title: 'Set Command',
                    icon: sources[1]
                }
            ]
        });
    });
};

// icon: sources[0]
// icon: sources[1]

// {
//     screen: 'AwesomeProject.DefineTaskScreen',
//         label: 'Define Task',
//     title: 'Define Task',
//     icon: sources[2]
// },
export default startTabs;
