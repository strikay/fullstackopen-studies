import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
    describe('SignInContainer Form', () => {
        it('can be filled and submitted with the correct data', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit}/>);
            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
            fireEvent.press(screen.getByText('Sign In'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);

                // onSubmit.mock.calls[0][0] contains the first argument of the first call
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            });
        }, 20000)
    })
})