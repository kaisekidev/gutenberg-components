import { Button } from '@wordpress/components';
import { useCopyToClipboard } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import noop from 'lodash/noop';

interface CopyToClipboardButtonProps extends Omit<Button.ButtonProps, 'text'> {
  text: Parameters<typeof useCopyToClipboard>[0];
  name: string;
  successNotice?: string;
}

export default function CopyToClipboardButton({
  children,
  name,
  successNotice,
  text,
  ...props
}: CopyToClipboardButtonProps) {
  const { createSuccessNotice } = useDispatch('core/notices');
  const showSuccessNotice = () => {
    createSuccessNotice
      && createSuccessNotice(successNotice || sprintf(__('Copied %s to clipboard'), name), {
        type: 'snackbar',
      }).catch(noop);
  };
  const ref = useCopyToClipboard<HTMLButtonElement>(text, showSuccessNotice);
  return (
    <Button
      ref={ref}
      {...props}
    >
      {children || sprintf(__('Copy %s'), name)}
    </Button>
  );
}
