import React, { useRef, useState } from 'react';

export default function AddStudentModal({
  isOpen = true,
  onClose = () => {},
  onSubmitSingle = () => {},
  onSubmitCsv = () => {},
  onDownloadTemplate = () => {},
}) {
  const [activeTab, setActiveTab] = useState('single');
  const [singleForm, setSingleForm] = useState({
    firstName: '',
    lastName: '',
    partnerName: '',
    studentId: '',
    universityEmail: '',
    programTrack: 'Web Development',
  });
  const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const inputStyle = {
    width: '100%',
    height: '44px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    padding: '0 14px',
    fontSize: '15px',
    color: '#111827',
    background: '#ffffff',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
  };

  const sectionXPadding = '24px';

  const handleSingleChange = (event) => {
    const { name, value } = event.target;
    setSingleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCsvPick = (event) => {
    const file = event.target.files?.[0] || null;
    setCsvFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0] || null;
    if (file) setCsvFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeTab === 'single') {
      onSubmitSingle(singleForm);
      return;
    }

    onSubmitCsv(csvFile);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(17, 24, 39, 0.62)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        style={{
          width: 'min(760px, calc(100vw - 32px))',
          maxHeight: '90vh',
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 24px 45px rgba(2, 6, 23, 0.22)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: `16px ${sectionXPadding}`,
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>Add New Students</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              borderRadius: '8px',
              background: 'transparent',
              color: '#9ca3af',
              fontSize: '28px',
              lineHeight: '1',
              cursor: 'pointer',
            }}
            aria-label="Close add student modal"
          >
            ×
          </button>
        </div>

        <div style={{ padding: `16px ${sectionXPadding} 10px` }}>
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                background: '#e5e7eb',
                padding: '4px',
                borderRadius: '10px',
              }}
            >
            <button
              type="button"
              onClick={() => setActiveTab('single')}
              style={{
                width: '50%',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'single' ? '#111827' : '#6b7280',
                background: activeTab === 'single' ? '#ffffff' : 'transparent',
                boxShadow: activeTab === 'single' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Single Entry
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bulk')}
              style={{
                width: '50%',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                color: activeTab === 'bulk' ? '#111827' : '#6b7280',
                background: activeTab === 'bulk' ? '#ffffff' : 'transparent',
                boxShadow: activeTab === 'bulk' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              Bulk Upload (CSV)
            </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
          <div style={{ minHeight: 0, flex: 1, overflowY: 'auto' }}>
          {activeTab === 'single' ? (
            <div
              style={{
                padding: `24px ${sectionXPadding} 26px`,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '16px',
                rowGap: '18px',
              }}
            >
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={singleForm.firstName}
                  onChange={handleSingleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={singleForm.lastName}
                  onChange={handleSingleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Partner Name</label>
                <input
                  type="text"
                  name="partnerName"
                  value={singleForm.partnerName}
                  onChange={handleSingleChange}
                  style={inputStyle}
                  placeholder="LastName FirstName"
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={singleForm.studentId}
                  onChange={handleSingleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={labelStyle}>Program / Track</label>
                <select
                  name="programTrack"
                  value={singleForm.programTrack}
                  onChange={handleSingleChange}
                  style={inputStyle}
                >
                  <option>Web Development</option>
                  <option>AI</option>
                </select>
              </div>

            </div>
          ) : (
            <div style={{ padding: `24px ${sectionXPadding} 26px` }}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleCsvPick}
                style={{ display: 'none' }}
              />

              <div
                style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '12px',
                  background: '#f9fafb',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  style={{ width: '40px', height: '40px', color: '#9ca3af', marginBottom: '12px' }}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 16.25"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8" />
                </svg>

                <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>
                  Drag and drop a .csv file here
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>or click to browse files</p>

                {csvFile ? (
                  <p style={{ fontSize: '14px', color: '#4b5563', marginTop: '12px' }}>Selected: {csvFile.name}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onDownloadTemplate}
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '100%',
                  marginTop: '16px',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#2563eb',
                  cursor: 'pointer',
                }}
              >
                Download CSV Template
              </button>
            </div>
          )}
          </div>

          <div
            style={{
              flexShrink: 0,
              padding: `16px ${sectionXPadding}`,
              background: '#f8fafc',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                border: '1px solid #d1d5db',
                background: '#fff',
                color: '#374151',
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {activeTab === 'single' ? 'Add Student' : 'Import CSV Roster'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
