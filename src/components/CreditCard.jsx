import React from "react";
import { Calendar, Download, Hash } from "lucide-react";
import StatusBadge from "./StatusBadge";

const CreditCard = ({ credit, onDownloadCertificate }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white transition-shadow duration-200 hover:shadow-md">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {credit.project_name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                <span>{credit.unic_id}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{credit.vintage}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={credit.status} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDownloadCertificate(credit)}
            className="flex items-center gap-2 rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Download Retirement Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
