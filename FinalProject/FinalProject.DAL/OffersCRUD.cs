using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class OffersCRUD : IDisposable
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddOffer(Offer offer)
        {
            context.Offers.Add(offer);
            context.SaveChanges();
        }

        #region IDisposable - Do Using

        public void Dispose()
        {
            _dispose(true);
        }

        ~OffersCRUD()
        {
            _dispose(false);
        }

        private void _dispose(bool disposing)
        {
            // close context
            context.Dispose();
            if (disposing)
            {
                GC.SuppressFinalize(this);
            }
        }

        #endregion
    }
}
