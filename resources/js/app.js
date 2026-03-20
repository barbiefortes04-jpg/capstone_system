import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AddStudentModal from './components/AddStudentModal';
import DefenseSchedulesDashboard from './components/DefenseSchedulesDashboard';

function mountDefenseSchedulesDashboard() {
	const rootElement = document.getElementById('teacher-defense-schedules-root');

	if (!rootElement) {
		return;
	}

	const root = createRoot(rootElement);
	root.render(React.createElement(DefenseSchedulesDashboard));
}

function mountAddStudentModal() {
	const rootElement = document.getElementById('add-student-modal-root');
	const trigger = document.getElementById('teacherAddStudentTrigger');

	if (!rootElement || !trigger) {
		return;
	}

	const root = createRoot(rootElement);
	const params = new URLSearchParams(window.location.search);
	let open = params.get('open_add_student') === '1';

	const updateUrl = (isOpen) => {
		const next = new URL(window.location.href);
		if (isOpen) {
			next.searchParams.set('open_add_student', '1');
		} else {
			next.searchParams.delete('open_add_student');
		}
		window.history.replaceState({}, '', next.toString());
	};

	const submitToServer = (payload) => {
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = '/teacher/advisees/add-student';

		const generatedEmail = (() => {
			const first = String(payload.firstName || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');
			const last = String(payload.lastName || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');
			if (!first && !last) return 'student@spup.edu.ph';
			return `${first}${first && last ? '.' : ''}${last}@spup.edu.ph`;
		})();

		const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
			|| document.querySelector('input[name="_token"]')?.value;

		const fields = {
			_token: csrf || '',
			student_name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
			student_email: payload.universityEmail || generatedEmail,
			partner_name: payload.partnerName || '',
			capstone_title: payload.capstoneTitle || 'New Capstone Project',
			track: payload.programTrack || 'Web Development',
			academic_year: payload.academicYear || 'SY 2026',
			group_number: '',
		};

		Object.entries(fields).forEach(([name, value]) => {
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = name;
			input.value = String(value);
			form.appendChild(input);
		});

		document.body.appendChild(form);
		form.submit();
	};

	const render = () => {
		document.body.classList.toggle('modal-open', open);
		document.body.style.overflow = open ? 'hidden' : '';

		if (open) {
			document.querySelectorAll('.review-students-dropdown[open]').forEach((el) => {
				el.removeAttribute('open');
			});
		}

		root.render(
			React.createElement(AddStudentModal, {
				isOpen: open,
				onClose: () => {
					open = false;
					updateUrl(false);
					render();
				},
				onSubmitSingle: (formData) => {
					submitToServer(formData);
				},
				onSubmitCsv: () => {
					alert('CSV import handler is ready. Connect this to your backend endpoint next.');
				},
				onDownloadTemplate: () => {
					alert('Download CSV template endpoint is not connected yet.');
				},
			})
		);
	};

	trigger.addEventListener('click', (event) => {
		event.preventDefault();
		open = true;
		updateUrl(true);
		render();
	});

	render();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		mountAddStudentModal();
		mountDefenseSchedulesDashboard();
	});
} else {
	mountAddStudentModal();
	mountDefenseSchedulesDashboard();
}
