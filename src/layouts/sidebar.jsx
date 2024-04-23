import {
  Box,
  List,
  VStack,
  Heading,
  Divider,
  ListItem,
  Button,
  ListIcon,
  Checkbox,
  CheckboxIcon,
  AccordionItem,
  AccordionPanel,
  Accordion,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useCategories } from "../context/category_context";
import { SearchIcon } from "@chakra-ui/icons";

export default function Sidebar() {
  const { categories, selectedCategories, toggleCategory } = useCategories();

  const allCategories = useMemo(() => {
    return categories.map((categoryGroup) => (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading size="sm" color='teal.700'>{categoryGroup.type}</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <List spacing={1} width='250px'>
            {categoryGroup.categories.map((category) => (
              <ListItem
                as={Button}
                variant={category.selected ? "solid" : "ghost"} 
                width="100%"
                bg={category.selected ? "teal.800" : "transparent" }
                justifyContent="start"
                onClick={() => toggleCategory(category.name)}
              >
                <Checkbox isChecked={category.selected} margin={2} />
                {category.name}
              </ListItem>
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
    ));
  }, [selectedCategories]);
  return (
    <Box className="sidebar" bg="white" p={3} minWidth="300px" height="100%" overflowY='auto'>
      <VStack width="100%">
        <Button w='100%' variant='ghost'>Advertise Your Property</Button>
        <Button w='100%' leftIcon={<SearchIcon />} variant='ghost'>Find properties near me</Button>
        <Heading size='md' textAlign='left'>Filters</Heading>
        <Accordion allowMultiple w="100%">
          {allCategories}
        </Accordion>
      </VStack>
    </Box>
  );
}