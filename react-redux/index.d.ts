import 'react-redux'

interface CustomerData {
	externalId: string
	firstName: string
	lastName: string
	addressLine1: string
	addressLine2: string
	city: string
	state: string
	zipCode: string
	phoneNumber: string
	email: string
	emailVerified: boolean
	phoneVerified: boolean
	dateOfBirth: string
}

interface Customer {
	externalId: string
	data: CustomerData
	fetchCustomerError: null | string
	updateAddressError: null | string
	updateAddressSuccess: boolean
	updateEmailError: null | string
	updateEmailSuccess: boolean
	phoneVerificationSuccess: boolean
	phoneVerificationError: null | string
	confirmPhoneVerificationSuccess: boolean
	confirmPhoneVerificationError: null | string
	isLoading: boolean
	verificationStatus: null | string
	verificationError: null | string
	suggestedAddresses: Record<string, string>[]
	suggestedAddressesError: null | string
}

declare module 'react-redux' {
	export interface DefaultRootState {
		customer: Customer
	}
}
