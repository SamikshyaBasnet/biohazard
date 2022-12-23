import React, { Dispatch, SetStateAction } from 'react'
import { Modal, Button } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/pro-regular-svg-icons'
interface SuccessModalProps {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}
const iconWrapperStyle = {
  display: 'flex',
  color: 'green',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '1.4rem',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  border: '0.2rem solid green',
}
// const iconStyle = {}
const SuccessModal = ({ opened, setOpened }: SuccessModalProps) => {
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} className="modal">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="icon" style={iconWrapperStyle}>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <h3>Pathogens Controlled</h3>
      </div>

      <div
        className="modal-button"
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button onClick={() => setOpened(false)}>OK</Button>
      </div>
    </Modal>
  )
}

export default SuccessModal
