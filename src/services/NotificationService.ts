import { notification } from 'ant-design-vue';

// Define a type for allowed notification types
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export default{
    name: 'Notify',
    createNotification(type: NotificationType,title: unknown, description: unknown){
        notification[type]({
            message: title as string,
            description: description as string,
        });
    },
}
