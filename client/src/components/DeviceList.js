import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'
import { Context } from '..'
import DeviceItems from './DeviceItems'

const DeviceList = observer(() => {
    const {device} = useContext(Context)
  return (
    <Row className='d-flex'>
      {device.devices.map(device => 
        <DeviceItems key={device.id} device={device}/>
        )}
    </Row>
  )
})

export default DeviceList
