import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

type ButtonProps = {
	loading: boolean;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
	variant: 'primary' | 'secondary';
};

const LoadingButton: React.FC<ButtonProps> = ({
	loading,
	disabled,
	className,
	children,
	variant,
}) => {
	return (
		<Button className={className} variant={variant} disabled={loading || disabled}>
			{loading && <Loader2 className='animate-spin' />}
			{children}
		</Button>
	);
};

export default LoadingButton;
