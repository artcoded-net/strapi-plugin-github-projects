import React from "react";
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import { Stack, Flex, Typography, Button } from "@strapi/design-system";
import { ExclamationMarkCircle, Trash } from "@strapi/icons";

const ConfirmationDialog = ({ visible, message, onClose, onConfirm }) => (
  <Dialog onClose={onClose} title="Confirmation" isOpen={visible}>
    <DialogBody icon={<ExclamationMarkCircle />}>
      <Stack spacing={2}>
        <Flex justifyContent="center">
          <Typography id="confirm-description">{message}</Typography>
        </Flex>
      </Stack>
    </DialogBody>
    <DialogFooter
      startAction={
        <Button onClick={onClose} variant="tertiary">
          Cancel
        </Button>
      }
      endAction={
        <Button
          variant="danger-light"
          startIcon={<Trash />}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      }
    />
  </Dialog>
);

export default ConfirmationDialog;
