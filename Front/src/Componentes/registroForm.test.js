import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RegistroFormulario } from './registroForm';

test('renderiza RegistroFormulario y maneja cambios correctamente', () => {
  render(
    <MemoryRouter>
      <RegistroFormulario isDarkMode={false} />
    </MemoryRouter>
  );

  // Verificar que se muestren los campos del formulario
  const nombreInput = screen.getByPlaceholderText('Escribe tu nombre');
  const apellidosInput = screen.getByPlaceholderText('Escribe tus apellidos');
  const correoInput = screen.getByPlaceholderText('Escribe tu email');
  const fechaNacInput = screen.getByLabelText('Fecha de nacimiento');
  const aliasInput = screen.getByPlaceholderText('Alias o username');
  const passwordInput = screen.getByPlaceholderText('Mínimo 8 letras');

  // Simular cambios en los campos del formulario
  fireEvent.change(nombreInput, { target: { value: 'John' } });
  fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
  fireEvent.change(correoInput, { target: { value: 'john.doe@example.com' } });
  fireEvent.change(fechaNacInput, { target: { value: '1990-01-01' } });
  fireEvent.change(aliasInput, { target: { value: 'johndoe' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Verificar que los valores se actualicen correctamente
  expect(nombreInput.value).toBe('John');
  expect(apellidosInput.value).toBe('Doe');
  expect(correoInput.value).toBe('john.doe@example.com');
  expect(fechaNacInput.value).toBe('1990-01-01');
  expect(aliasInput.value).toBe('johndoe');
  expect(passwordInput.value).toBe('password123');

  // Simular envío del formulario
  const submitButton = screen.getByRole('button', { name: 'Regístrate' });
  fireEvent.click(submitButton);
});
