using films_assignment_api.DataLayer.Models;
using LiteDB;
using System.Linq.Expressions;

namespace films_assignment_api.DataLayer
{
    public class DbService<T> where T : BaseModel
    {
        private LiteDatabase _liteDb;

        public DbService(ILiteDbContext liteDbContext)
        {
            _liteDb = liteDbContext.Database;
        }

        public IEnumerable<T> FindAll()
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .FindAll();
        }

        public IEnumerable<T> FindAll(int skip, int take)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .FindAll().Skip(skip).Take(take);
        }

        public T FindOne(string id)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .Find(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .Find(predicate);
        }

        public bool Insert(T model)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .Insert(model)!=null;
        }

        public int InsertBulk(IEnumerable<T> model)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .InsertBulk(model);
        }

        public bool Update(T model)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .Update(model);
        }

        public bool Delete(int id)
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .Delete(id);
        }

        public int DeleteAll()
        {
            return _liteDb.GetCollection<T>(typeof(T).Name)
                .DeleteAll();
        }
    }
}
