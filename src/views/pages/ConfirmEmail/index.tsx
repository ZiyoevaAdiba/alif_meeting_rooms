import { makeStyles } from '@material-ui/core';
import { Page } from '../../../layouts/Page';
import { EmailAlert } from '../../../shared/components/Auth/EmailAlert';

const useStyles = makeStyles((theme) => ({

}));

export const ConfirmEmail = () => {
  const classes = useStyles();

  return (
    <Page title="Подтверждение">
      <EmailAlert />
    </Page>
  );
}

