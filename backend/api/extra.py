def predict_test():
    products=Product.objects.all()
    category_mapping={'MntWines':'wines','MntFruits':'fruits','MntMeatProducts':'meat','MntFishProducts':'fish','MntSweetProducts':'sweet','MntGoldProds':'gold'}
    for product in Product.objects.all():
        old_category_name = product.category
        new_category_name = category_mapping.get(old_category_name, old_category_name)
        product.category = new_category_name
        product.save()


def update_dataset():
    data = pd.read_csv('output.csv')

    for index, row in data.iterrows():
        product = Product()
        
        # Assign values from the dataset columns to the corresponding fields
        product.product_id=row["id"]
        product.name = row['name']
        product.category = row['category']
        product.price = row['price']
        product.discount_percentage = row['discount_percentage']
        product.rating = row['rating']
        product.rating_count = row['rating_count']
        product.description = row['description']
        product.review = row['review_content']
        product.image_link = row['image_link']
        
        # Save the Product object to the database
        product.save()




def get_products_with_percentage(percentage_per_category):
    products_by_category = Product.objects.values('category').annotate(
        total_products=Count('id'),
    )

    total_products = min(30, Product.objects.count()) 
    
    filtered_products = []
    for category_data in products_by_category:
        category = category_data['category']
        if category in percentage_per_category.index:
            target_percentage = percentage_per_category.loc[category]
            target_products = total_products * target_percentage * 0.01
            if not pd.isna(target_products) and target_products >= 0:
                products = Product.objects.filter(category=category)[:int(target_products)]
                filtered_products.extend(list(products))

    
    return filtered_products


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def get_personal_info(request):
    user = User.objects.get(id=request.user.id)
    Marital_Status=request.data.get("maritalstatus")
    Education=request.data.get("education")
    Income=request.data.get("income")
    try:
        
        if user:
            user.info.Marital_Status=Marital_Status
            user.info.Education=Education
            user.info.Income=Income
            user.info.save()
            user.save()
            return Response({"result":"Got the info"})
        else:
            return Response({'error': 'Log the user'}, status=status.HTTP_400_BAD_REQUEST) 
    except Exception as e:
        print(e)
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)
    



@api_view(['Get'])
def update_user_purchase(request):
    data=pd.read_csv("/Users/gopalareddy/Desktop/repo/ecommerce-react/backend/ml_models/ml_train/cosine/usernames_pur.csv")
    for index, row in data.iterrows():
        try:
            product=Product.objects.get(product_id=row["ProductId"])
            users=User.objects.get(username=row["User"])
            purchase=Purchase.objects.create(user=users,product=product)
            purchase.save()
        except Exception as e:
            print(str(e))
        print(index)
    return Response({"got":"got"})




@api_view(['Get'])
def update_user(request):
    data=pd.read_csv("/Users/gopalareddy/Desktop/repo/ecommerce-react/backend/ml_models/ml_train/cosine/usernames.csv")
    for index, row in data.iterrows():
        try:
            email=str(row["user_name"])+str("@gmail.com")
            user=User.objects.create(username=row["user_name"],email=email,name=row["user_name"])
            user.set_password("user1234")
            user.save()
            print(index)
        except Exception as e:
            print(str(e))
            continue

    return Response({"got":"got"})




from django.core.exceptions import ValidationError

def update_dataset():
    data = pd.read_csv('/Users/gopalareddy/Desktop/repo/ecommerce-react/backend/ml_models/ml_train/cosine/products.csv')

    for index, row in data.iterrows():
        product = Product()
        
        # Assign values from the dataset columns to the corresponding fields
        product.product_id = row["id"]
        product.name = row['name']
        product.category = row['category']
        product.price = row['price']
        product.discount_percentage = row['discount_percentage']
        product.rating = row['rating']
        product.rating_count = row['rating_count']
        product.description = row['description']
        product.review = row['review_content']
        product.image_link = row['image_link']
        
        try:
            # Validate the Product object
            product.full_clean()
        except ValidationError as e:
            print(f"Product {product.name} is not valid: {e}")
            continue  # Skip saving the invalid product
        
        # Save the Product object to the database
        product.save()
        
        # Check if the object was saved successfully
        if product.pk:
            pass
        else:
            print(f"Failed to save product {product.name}.")
