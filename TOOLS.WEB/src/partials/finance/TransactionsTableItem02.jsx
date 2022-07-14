import React from 'react';

function TransactionsTableItem(props) {

  const statusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-600';
      case 'Canceled':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  const amountColor = (amount) => {
    switch (amount.charAt(0)) {
      case '+':
        return 'text-emerald-500';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <tr className="cursor-pointer" onClick={(e) => { e.stopPropagation(); props.setTransactionPanelOpen(true); }}>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked}  onClick={(e) => e.stopPropagation()} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap md:w-1/2">
        <div className="flex items-center">
          <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={props.image} width="36" height="36" alt={props.name} />
          </div>
          <div className="font-medium text-slate-800">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">
          <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(props.status)}`}>{props.status}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className={`text-right font-medium ${amountColor(props.amount)}`}>{props.amount}</div>
      </td>
    </tr>
  );
}

export default TransactionsTableItem;
