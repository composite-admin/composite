import keys from '@/app/(admin)/inventory/keys'
import { DetailsModal } from '@/components/shared/DetailsModal'
import ViewDetails from '@/components/shared/ViewDetails'
import React from 'react'

const InventoryDetailsModal = () => {
  return (
    <DetailsModal title="Inventory" description="Check Inventory">
        <ViewDetails title="Inventory Details" dateSubmitted="6th July, 2023" editAction={null} keys={keys} />
      </DetailsModal>
  )
}

export default InventoryDetailsModal