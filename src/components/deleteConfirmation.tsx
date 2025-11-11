import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  itemName = "item",
} : any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent textAlign="center" >
        <ModalHeader>Delete {itemName}?</ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this {itemName}? 
          </p>
        </ModalBody>
        <ModalFooter justifyContent="center" >
          <Button variant="ghost" border="2px solid #D0D5DD" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" ml={3} onClick={onConfirm}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
