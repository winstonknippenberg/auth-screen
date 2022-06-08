import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal } from 'react-native';
import { NumberInputs } from '../components/NumberInputs';
import ProgressBar from 'react-native-progress/Bar';
import { VerificationCode } from '../components/VerficationCode';
import { Dimensions } from 'react-native';
import { ChevronLeft } from 'react-native-feather';
import { ConfirmationButton } from '../components/ConfirmationButton';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import {
  ConfirmationResult,
  getAuth,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { firebaseConfig } from '../config/firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const screen = Dimensions.get('screen');
const screenWidth = screen.width;
const screenHeight = screen.height;

export const Login = () => {
  const recaptchaVerifier = React.useRef(null);
  const [fbConfirmation, setFBConfirmation] =
    React.useState<ConfirmationResult>();
  const [areaCode, changeAreaCode] = React.useState('+972');
  const [number, onChangeNumber] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);

  const getEditedNumber = (areaCode: string, number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.charAt(0) === '0') {
      return `${areaCode}${cleanNumber.substring(1)}`;
    } else {
      return `${areaCode}${cleanNumber}`;
    }
  };
  const phoneNumber = getEditedNumber(areaCode, number);
  const auth = getAuth();

  const handlePhoneAuth = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier.current!
      );

      setFBConfirmation(confirmationResult);
      setModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirmation = async () => {
    try {
      console.log({ verificationCode });
      const result = await fbConfirmation!.confirm(verificationCode);
      console.log(`success: ${result.user.phoneNumber}`);
      //TODO navigation
    } catch (error) {
      console.log(error);
      setModalVisible(false);
    }
  };

  return (
    <>
      {!modalVisible && (
        <ProgressBar
          progress={0.2}
          width={screenWidth}
          style={styles.statusBar}
          unfilledColor={'#d1e1f5'}
          borderColor={'#afafaf'}
        />
      )}
      <View
        style={modalVisible ? styles.darkendScreen : styles.screenContainer}
      >
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        {!modalVisible && (
          <>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/safeLogo.jpeg')}
                style={styles.logo}
              />
              <View>
                <Text style={styles.text} numberOfLines={2}>
                  הזן את מספר הטלפון שלך על מנת להתחבר, אנחנו נשלח לך קוד אימות
                </Text>
              </View>
            </View>
            <NumberInputs
              numberState={[number, onChangeNumber]}
              areaCodeState={[areaCode, changeAreaCode]}
            />
            <Pressable onPress={handlePhoneAuth} style={styles.sendMeBottun}>
              <Text style={styles.sendMeText}>שלח לי קוד אימות</Text>
            </Pressable>
          </>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ProgressBar
                progress={0.4}
                width={screenWidth}
                unfilledColor={'#d1e1f5'}
                borderColor={'#afafaf'}
              />
              <Text style={styles.modalText}>
                שלחנו לך קוד אימות חשבון בהודעת SMS, הקוד נשלח למספר:{' '}
                {phoneNumber}
              </Text>
              <Text style={styles.modalSecondText}>קוד אבטחה</Text>
              <VerificationCode
                codeState={[verificationCode, setVerificationCode]}
              />
              <View style={styles.modalButtonsView}>
                <Pressable style={styles.notMyNumber}>
                  <ChevronLeft stroke={'#2f8cea'} />
                  <Text
                    style={styles.textStyle}
                    onPress={() => setModalVisible(false)}
                  >
                    לא הטלפון שלי
                  </Text>
                </Pressable>
                <ConfirmationButton handleConfirmation={handleConfirmation} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sendMeBottun: {
    alignItems: 'center',
    marginTop: 40,
  },
  sendMeText: {
    color: '#2f8cea',
    fontSize: 16,
  },
  text: {
    fontFamily: '',
    marginRight: 35,
    marginLeft: 35,
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  logo: {
    height: screenHeight * 0.18,
    width: screenWidth * 0.43,
    margin: 30,
  },
  darkendScreen: {
    flex: 1,
    backgroundColor: '#afafaf',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  statusBar: {
    marginTop: 70,
    height: 7,
    borderWidth: 0.25,
  },
  logoContainer: {
    alignItems: 'center',
  },
  submit: {
    backgroundColor: '#F7F7F7',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    marginTop: 150,
    flex: 1,
    backgroundColor: '#eff4fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    margin: 40,
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
  modalSecondText: {
    fontSize: 18,
    textAlign: 'center',
  },
  notMyNumber: {
    flexDirection: 'row',
    paddingLeft: 15,
    marginTop: 15,
  },
  textStyle: {
    color: '#2f8cea',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
  },
  modalButtonsView: {},
});
