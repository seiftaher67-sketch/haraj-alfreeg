# TODO: Integrate Frontend Registration with Backend API

## Current Status
- Backend registration endpoint: POST /api/auth/register (expects name, email, phone?, password, password_confirmation)
- Frontend RegisterModal currently uses phone + SMS verification
- Need to update to email/password registration with optional phone

## Tasks
- [ ] Update RegisterModal.js to use email/password fields instead of phone/SMS
- [ ] Add optional phone field
- [ ] Implement API call to backend registration endpoint using fetch
- [ ] Handle success response (close modal, show success message)
- [ ] Handle validation errors from backend
- [ ] Test registration flow
- [ ] Ensure CORS allows requests from frontend (localhost:3000) to backend (localhost:8000)
