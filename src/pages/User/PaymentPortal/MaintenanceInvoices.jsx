import React from 'react';

import PaymentMaintenance from '../../../components/User/PaymentPortal/Maintenance/PaymentMaintenance';
import PaymentPending from '../../../components/User/PaymentPortal/Maintenance/PaymentPending';
//  import PaymentDue from '../../../components/User/PaymentPortal/Maintenance/PaymentDue';

const MaintenanceInvoices = () => {
 
 const maintenanceAmount = 1500;
    const penaltyAmount = 500;

    return (
        <div className="p-4 bg-gray-100">
            
            <PaymentMaintenance maintenanceAmount={maintenanceAmount} penaltyAmount={penaltyAmount} />
            <PaymentPending />
            {/* <PaymentDue /> */}
            
        </div>
    );
};

export default MaintenanceInvoices;
