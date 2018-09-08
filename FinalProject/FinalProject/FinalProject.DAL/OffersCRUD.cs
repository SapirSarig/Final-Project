using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.DAL
{
    public class OffersCRUD
    {
        private FinalProjectContext context = new FinalProjectContext();

        public void AddOffer(Offer offer)
        {
            context.Offers.Add(offer);
            context.SaveChanges();
        }

        public Offer GetOffer(int id)
        {
            return context.Offers.FirstOrDefault(o => o.Id == id);
        }

        public IEnumerable<Offer> GetOffers()
        {
            return context.Offers.ToList();
        }
    }
}
