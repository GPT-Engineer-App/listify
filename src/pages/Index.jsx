import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Input, IconButton, HStack, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Can't add an empty todo",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { content: inputValue, timestamp: new Date() }]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4}>
          <Heading>Todo App</Heading>
          <HStack>
            <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} />
            <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="blue" aria-label="Add todo" />
          </HStack>
          <VStack spacing={2} align="stretch">
            {todos.map((todo, index) => (
              <HStack key={index} justifyContent="space-between">
                <Text>{todo}</Text>
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
