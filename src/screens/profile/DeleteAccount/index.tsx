import CustomBtn from '@/screens/components/common/button/Button';
import {CheckBox} from '@/screens/components/common/checkBox';
import {colors} from '@/styles/colors';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import {PageTitle} from '../components/PageTitle';
import {DeleteAccountStyle} from './style';

export const DeleteAccount = () => {
  const {t} = useTranslation('UserProfile');
  const [selected, setSelected] = useState(false);

  const handleLanguageSelect = () => {
    setSelected(!selected);
  };
  return (
    <ScrollView>
      <View style={DeleteAccountStyle.container}>
        <PageTitle title={t('DeleteAccount.DeleteAccount')} />

        <Text style={DeleteAccountStyle.text}>
          {t('DeleteAccount.PermanentlyDeleteAccount')}
        </Text>
        <Text style={DeleteAccountStyle.description}>
          {t('DeleteAccount.description')}
        </Text>
        <View style={{gap: 15}}>
          <Text style={DeleteAccountStyle.text}>
            {t('DeleteAccount.deletingYourAccountMean')}
          </Text>
          <View style={DeleteAccountStyle.AlertBox}>
            <View style={DeleteAccountStyle.dot} />
            <Text style={DeleteAccountStyle.description}>
              {t('DeleteAccount.PermanentDataDeletion')}
            </Text>
          </View>
          <View style={DeleteAccountStyle.AlertBox}>
            <View style={DeleteAccountStyle.dot} />
            <Text style={DeleteAccountStyle.description}>
              {t('DeleteAccount.LossOfAccess')}
            </Text>
          </View>
          <View style={DeleteAccountStyle.AlertBox}>
            <View style={DeleteAccountStyle.dot} />
            <Text style={DeleteAccountStyle.description}>
              {t('DeleteAccount.IrreversibleAction')}
            </Text>
          </View>
        </View>
        <View style={{gap: 15}}>
          <Text style={DeleteAccountStyle.text}>
            {t('DeleteAccount.ConsiderBeforeDeleting')}
          </Text>
          <View style={DeleteAccountStyle.AlertBox}>
            <View style={DeleteAccountStyle.dot} />
            <Text style={DeleteAccountStyle.description}>
              {t('DeleteAccount.SupportHelp')}
            </Text>
          </View>
          <View style={DeleteAccountStyle.AlertBox}>
            <View style={DeleteAccountStyle.dot} />
            <Text style={DeleteAccountStyle.description}>
              {t('DeleteAccount.TemporaryDeactivation')}
            </Text>
          </View>
        </View>
        <View style={{gap: 15}}>
          <Text style={DeleteAccountStyle.text}>
            {t('DeleteAccount.FinalConfirmation')}
          </Text>
          <Text style={DeleteAccountStyle.description}>
            {t('DeleteAccount.ConfirmDeletionMessage')}
          </Text>
          <CheckBox
            isChecked={selected}
            onPress={() => handleLanguageSelect()}
            gap={10}
            title={t('DeleteAccount.ConfirmDeleteCheckbox')}
          />
        </View>
        <View style={{gap: 12, paddingVertical: 8}}>
          <CustomBtn
            width={90}
            title="Deactivate Account"
            titleColor={colors.primary[800]}
            radius={8}
            backColor="white"
            borderWidth={1}
            borderColor={colors.primary[800]}
            direction="rtl"
            onClick={() => {}}
          />
          <CustomBtn
            width={90}
            title={t('DeleteAccount.DeleteAccountButton')}
            radius={8}
            direction="rtl"
            onClick={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
};
