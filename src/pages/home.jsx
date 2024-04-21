import { VStack, Wrap } from '@chakra-ui/react'
import React from 'react'
import PropertyCard from '../components/property_card'
import properties from '../temp/properties'

export default function HomePage() {
  return (
    <VStack height='100%' overflowY='auto'>
      <Wrap spacing='20px' justify='space-around'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map(() => <PropertyCard property={properties} />)}
      </Wrap>
    </VStack>
  )
}
