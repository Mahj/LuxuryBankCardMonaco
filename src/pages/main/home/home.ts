import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { AuthProvider, FirestoreProvider, NetworkProvider, TranslateProvider, LoadingProvider, ToastProvider, NotificationProvider } from '../../../providers';
import { User } from '../../../models';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private searchUser: string;
  private users: User[];
  private excludedIds: string[];
  private subscription: Subscription;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private auth: AuthProvider,
    private firestore: FirestoreProvider,
    private network: NetworkProvider,
    private translate: TranslateProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private notification: NotificationProvider,
    private menuCtrl: MenuController) {
    this.excludedIds = [];
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.loading.show();
    // Get the list of users on Firestore.
    this.subscription = this.firestore.getUsers().valueChanges().subscribe((users: User[]) => {
      this.loading.hide();
      this.users = users;
    });
    // Add logged in user to excludedIds so they won't show up on the list of users.
    this.excludedIds = [this.auth.getUserData().userId];
    // Set pushToken if the user has enabled push notifications.
    if (this.auth.getUserData().notifications) {
      this.notification.init();
    }
  }

  ionViewWillUnload() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  header(record, recordIndex, records) {
    if (recordIndex == 0) {
      return record;
    }
    return null;
  }

  // Popup to send a push notification to a user.
  private sendPushNotification(user: User): void {
    if (this.network.online()) {
      // Check if user is accepting push notifications or not.
      if (user.notifications && user.pushToken) {
        // Show a popup for the user to enter a message to be sent as push notification.
        let alert = this.alertCtrl.create({
          title: user.firstName + ' ' + user.lastName,
          subTitle: this.translate.get('home.send.text'),
          inputs: [
            {
              name: 'message',
              placeholder: this.translate.get('home.send.message'),
              type: 'text'
            }
          ],
          buttons: [
            {
              text: this.translate.get('home.send.button.cancel'),
              role: 'cancel',
              handler: data => { }
            },
            {
              text: this.translate.get('home.send.button.send'),
              handler: data => {
                // Send push notification to user.
                if (data.message) {
                  if (user.pushToken) {
                    this.loading.show();
                    this.notification.sendPush(user.pushToken, data.message).then(response => {
                      this.loading.hide();
                      this.toast.show(this.translate.get('home.send.sent'));
                    }).catch(err => {
                      this.loading.hide();
                      this.toast.show(this.translate.get('home.send.error') + JSON.stringify(err));
                    });
                  }
                } else {
                  return false;
                }
              }
            }
          ]
        });
        alert.present();
      } else {
        // User has disabled push notifications.
        this.toast.show(this.translate.get('home.send.disabled'));
      }
    }
  }

}
