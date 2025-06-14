import React, { createContext, useContext, useState } from 'react';

const WidgetContext = createContext(null);

export const WidgetProvider = ({ children , widgetData }) => {
  const [widgets, setWidgets] = useState([]);

  return (
    <WidgetContext.Provider value={{ widgetId : widgetData?.id , widgetData }}>
      {children}
    </WidgetContext.Provider>
  );
};

// ✅ Custom hook
export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidget must be used within a WidgetProvider');
  }
  return context;
};
