using FinalProject.DAL;
using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class OffersBL
    {
        private OffersCRUD offersCRUD;

        public OffersBL()
        {
            offersCRUD = new OffersCRUD();
        }

        public bool AddOffer(Offer offer)
        {
            offersCRUD.AddOffer(offer);
            return true;
        }
    }
}
